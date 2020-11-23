import './App.css';
import CheckInInsights from './containers/CheckInInsights';
import CreateCheckIn from './containers/CreateCheckIn';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:3002/graphql"
});

function App() {
  return (

    <BrowserRouter>
    <ApolloProvider client={client}>
      <div className="App">
        <h1> Mood Analyzer</h1>
        <hr/>

          <Switch>
            <Route path="/" exact component={CheckInInsights} />
            <Route path="/new" exact component={CreateCheckIn} />
          </Switch>

        
      </div>
    </ApolloProvider>
    </BrowserRouter>
   
  );
}

export default App;
