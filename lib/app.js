const axios = require('axios')
const SLACK_URL = process.env.SLACK_URL;

exports.lambdaHandler = async (event, context) => {
    try {
        // eventのパラメータ内容は下記を参照
        // https://docs.aws.amazon.com/ja_jp/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html
        var color;
        var env = event.detail.pipeline.split('-')[0]
        var pretext = "";
        var text = "CodePipeline " + event.detail.pipeline + " ";
        var pipelineState = event.detail.state;
        if (pipelineState == 'STARTED') {
            pretext += env + "のデプロイ始まったよー(๑•̀ㅂ•́)و✧";
            color = "#888888";
            text += "has started.";
        }
        else if (pipelineState == 'SUCCEEDED') {
            pretext += env + "のデプロイ終わったよ♪";
            color = "good";
            text += "has *succeeded*.";
        }
        else if (pipelineState == 'FAILED') {
            pretext += env + "のデプロイ失敗しちゃった(´・ω・`)";
            color = "danger";
            text += "has *failed*.";
        }
        else {
            color = "warning";
            text += "has " + pipelineState + " (This is an unknown state to the Slack notifier.)";
        }

        const options = {
            attachments: [{
                color: color,
                pretext: pretext,
                text: text,
            }],
        };

        await axios.post(SLACK_URL, JSON.stringify(options))
        .then((response) => {
            console.log('SUCCEEDED: Sent slack webhook: \n', response.data);
        })
        .catch((error) => {
            console.log('FAILED: Send slack webhook', error);
        });
    } catch (err) {
        console.log(err);
        return err;
    }
};
