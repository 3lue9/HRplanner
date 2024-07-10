import { supabase } from "../utils/supabaseClient";
import IUser from "../types/user.type";

class AuthService {
  async login(email: string, password: string) {
    console.log(`Logging in with email: ${email}`);
    const { data, error } = await this.withRetry(() => 
      supabase.auth.signInWithPassword({ email, password })
    );

    if (error) {
      console.error('Error logging in:', error);
      throw error;
    }

    return data;
  }

  async logout() {
    console.log('Logging out');
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }

  async register(email: string, password: string, displayName: string) {
    console.log(`Registering with email: ${email}`);
    const { data, error } = await this.withRetry(() => 
      supabase.auth.signUp({ email, password })
    );

    if (error) {
      console.error('Error signing up:', error);
      throw error;
    }

    if (data.user) {
      const updateError = await this.createProfile(data.user.id, displayName);
      if (updateError) {
        console.error('Error creating profile:', updateError);
        throw updateError;
      }
    }

    return data;
  }

  async createProfile(userId: string, displayName: string) {
    const { error } = await this.withRetry(() => 
      supabase.from('profiles').insert({ id: userId, display_name: displayName })
    );

    return error;
  }

  async getCurrentUser(): Promise<IUser | null> {
    console.log('Getting current user');
    const { data, error } = await this.withRetry(() => supabase.auth.getUser());

    if (error) {
      console.error('Error getting current user:', error);
      throw error;
    }

    const user = data.user;
    if (user) {
      const { data: profile, error: profileError } = await this.withRetry(() => 
        supabase.from('profiles').select('display_name').eq('id', user.id).single()
      );

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        throw profileError;
      }

      const email = user.email || '';
      return {
        id: user.id,
        email,
        roles: ["ROLE_USER"], // Example roles, adjust as needed
        username: profile.display_name, // Use display_name as username
      };
    }

    return null;
  }

  async withRetry(func: Function, retries = 5, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        return await func();
      } catch (error: any) {
        if (error.status === 429 && i < retries - 1) {
          // 429 status code means rate limit exceeded
          console.log(`Rate limit exceeded. Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        } else {
          if (error.status === 429) {
            // Inform the user about the rate limit
            throw new Error("Rate limit exceeded. Please try again later.");
          }
          throw error;
        }
      }
    }
  }
}

export default new AuthService();
