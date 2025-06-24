//@ts-ignore
import Laboratory from '@moleculer/lab';

module.exports = process.env.NODE_ENV === "development" ? {
    mixins: [Laboratory.AgentService],
    settings: {
        token: process.env.LABORATORY_TOKEN,
        apiKey: process.env.LABORATORY_KEY
    }
} : {
  name: "laboratory"
};
