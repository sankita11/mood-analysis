

module.exports = (mysqlDB) => {

    return {
        getAllCheckIns: async () => {
            const queryResult = await mysqlDB.query("SELECT * from userCheckIn order by checkInTime desc");
            return queryResult[0];
        },
    
        getAverageMoodScore: async () => {
            const queryResult = await mysqlDB.query(`
            SELECT 
                ROUND(( count(*) * 100 / 
                    (select count(*) as total from userCheckIn)
                 ),1) as averagePercentage,  
                moodScore from userCheckIn 
                group by moodScore order by averagePercentage desc limit 1 
            `);
            console.log(queryResult[0][0])
            return queryResult[0][0];
        },

        getTotalCheckIn: async () => {
            const queryResult = await mysqlDB.query(" select count(*) as total from userCheckIn ")
            return queryResult[0][0];
        },

        createUserCheckIn: async (checkIn) => {
            const result = await mysqlDB.query("INSERT INTO userCheckIn SET ?", [checkIn]);
            return result[0]["affectedRows"] ? true: false;
        }
    
    }
    
}

