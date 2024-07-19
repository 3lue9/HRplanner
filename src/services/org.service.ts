import { supabase } from "../utils/supabaseClient";

class OrgService {
  async verifyORG(orgCode: string) {
    console.log(`Verifying org: ${orgCode}`);

    try {
      // Query the table to check if it exists
      const { data, error } = await supabase
        .from(orgCode)
        .select('*')
        //.limit(1); // Limit to 1 to minimize data transfer

      if (error) {
        console.error('Error querying table:', error);
        throw error;
      }

      // If no data is returned, the table exists but is empty
      if (data.length === 0) {
        console.log(`Table ${orgCode} exists but does not have any data.`);
        return true; // Table exists, but it's empty
      }

      console.log(`Table ${orgCode} exists with data.`);
      return true; // Table exists and has data
    } catch (err) {
      console.error('Unexpected error:', err);
      throw err;
    }
  }
}

export default new OrgService();
