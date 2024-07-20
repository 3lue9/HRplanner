import { supabase } from "../utils/supabaseClient";

class OrgService {
  async verifyORG(orgCode: string) {
    console.log(`Verifying org: ${orgCode}`);

    try {
      // Query the table to check if it exists
      const { data, error, status } = await supabase
        .from(orgCode)
        .select('*')
        .limit(1); // Limit to 1 to minimize data transfer

      console.log(`Status: ${status}`);
      console.log(`Data: ${JSON.stringify(data)}`);
      console.log(`Error: ${JSON.stringify(error)}`);

      if (error && status !== 406) {
        console.error('Error querying table:', error);
        throw error;
      }

      if (data && data.length > 0) {
        console.log(`Table ${orgCode} exists with data.`);
        return true;
      } else {
        console.log(`Table ${orgCode} exists but does not have any data.`);
        return true;
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      throw err;
    }
  }
  
  async WriteToDB(orgCode: string) {
    console.log("writing fake data to db and retriving it")
    console.log('table name', orgCode)

    
    const { data, error } = await supabase.from('RanchDelMare').insert([
      { timestamp: '1721343600' },
      { events: [] },
    ])
    .select()

  console.log(JSON.stringify(data))

  if (error){
    console.log(error)
  }

}



  async GetInfoByDay(orgCode: string, timestamp: string) {
    console.log(`Retrieving data for day: ${timestamp}`);

    try {
      // Assuming 'timestamp' column is of string type and matches the format in your query
      const { data, error, status } = await supabase
        .from(orgCode)
        .select('*')
        .eq('timestamp', timestamp); // Assuming 'timestamp' column matches the timestamp

      console.log(`Status: ${status}`);
      console.log(`Data: ${JSON.stringify(data)}`);
      console.log(`Error: ${JSON.stringify(error)}`);

      if (error && status !== 406) {
        console.error('Error querying table:', error);
        throw error;
      }

      if (data && data.length > 0) {
        console.log(`Data for ${timestamp} retrieved successfully.`);
        return data;
      } else {
        console.log(`No data found for ${timestamp}.`);
        return null;
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      throw err;
    }
  }
}

export default new OrgService();
