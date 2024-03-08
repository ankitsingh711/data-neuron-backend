import { cloudwatch } from "../config/awsConfig"
import { logger } from "../config/logging"

export const logToCloundWatch = (message) => {
    const params = {
        logGroupName: 'testing',
        logStreamName: '',
        logEvents: [
            {
                message,
                timeStamp: Date.now()
            }
        ]
    }

    // cloudwatch.putDashboard(params, (err, data) => {
    //     if(err) {
    //         logger.error(`Error logging to cloudwatch ${err}`)
    //     }
    // })
}

logToCloundWatch(' This is a test log message ')