// auth.service.ts
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

  async register(email: string, password: string, fullName: string, orgCode: string) {
    console.log(`Registering with email: ${email}`);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, // Save 'fullName' in the user metadata
          orgCode: orgCode
        }
      }
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
        username: user.user_metadata?.full_name,
        name: user.user_metadata?.full_name || 'Default Name', // Adjust based on your metadata
        orgCode: user.user_metadata.orgCode,
      };
    }

    return null;
  }
}

export default new AuthService();
