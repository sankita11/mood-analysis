const { buildSchema } = require('graphql');

const CheckInModel = require('./mood-analysis.model');


const schema = buildSchema(`

  type UserCheckIn {
    id: Int!
    moodScore: Int
    feeling: String
    comment: String
    checkInTime: String
  }

  type CheckInInsight {
    averagePercentage: Float
    moodScore: Int
    total: Int
  }


  input CheckInInput{
    moodScore: Int
    feeling: String
    comment: String
  }

  type Query {
    getUserCheckIns : [UserCheckIn]
    getInsights: CheckInInsight
    getTotalCheckin: CheckInInsight
  }
  type Mutation {
    createUserCheckIn(input: CheckInInput) : String
  }
`);

const root = {
    getUserCheckIns: async (args, {db}) => {
        return await CheckInModel(db).getAllCheckIns()
    },
    getInsights : async( args, {db}) => {
      return await CheckInModel(db).getAverageMoodScore()
    },
    getTotalCheckin: async (args, {db}) => {
      return await CheckInModel(db).getTotalCheckIn()
    },

    createUserCheckIn: async ({input}, {db}) => {     
        let checkIn = input;
        const result = await CheckInModel(db).createUserCheckIn(checkIn);
        if( result ){
          return "CheckIn created successfully"
        }else{
          return "Error in creating CheckIn"
        }
    },
  };

module.exports = {
    schema,
    root
}

