import { supabase } from "../utils/supabaseClient";
import IUser from "../types/user.type";

class AuthService {
  async login(email: string, password: string) {
    console.log(`Logging in with email: ${email}`);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

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

  async register(email: string, password: string) {
    console.log(`Registering with email: ${email}`);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Error signing up:', error);
      throw error;
    }

    return data;
  }

  async getCurrentUser(): Promise<IUser | null> {
    console.log('Getting current user');
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('Error getting current user:', error);
      throw error;
    }

    if (user) {
      const email = user.email || '';
      return {
        id: user.id,
        email,
        roles: ["ROLE_USER"], // Example roles, adjust as needed
        username: email.split('@')[0] // Example username generation
      };
    }

    return null;
  }
}

export default new AuthService();
