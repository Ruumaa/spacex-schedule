import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const getLaunchesUpcoming = async () => {
  try {
    const client = new ApolloClient({
      // uri specifies the URL of our GraphQL server.
      uri: 'https://spacex-production.up.railway.app/',
      // cache is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.
      cache: new InMemoryCache(),
    });

    // query
    const GET_UPCOMING_LAUNCHES = gql`
      query LaunchesUpcoming {
        launchesUpcoming(limit: 10) {
          id
          launch_date_utc
          launch_year
          mission_name
          rocket {
            rocket {
              id
              name
              country
              first_flight
              success_rate_pct
              cost_per_launch
              wikipedia
            }
          }
        }
      }
    `;
    const { data } = await client.query({
      query: GET_UPCOMING_LAUNCHES,
    });

    return data.launchesUpcoming;
  } catch (error) {
    console.error('Error when fetch getLaunchesUpcoming', error);
  }
};
