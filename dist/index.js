"use strict";
// import { bot } from "./bot";
Object.defineProperty(exports, "__esModule", { value: true });
// async function main() {
//   bot.start();
// }
// main()
//   .then(() => console.log("bot started"))
//   .catch(console.error);
require("@tensorflow/tfjs");
require("@tensorflow/tfjs-backend-webgl");
const qna_1 = require("@tensorflow-models/qna");
// Load the model.
async function main() {
    // console.log(qna)
    const model = await (0, qna_1.load)();
    const passage = "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Facebook. Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a California privately held company on September 4, 1998, in California. Google was then reincorporated in Delaware on October 22, 2002. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet's leading subsidiary and will continue to be the umbrella company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page who became the CEO of Alphabet.";
    const question = "Who is the CEO of Google?";
    // Finding the answers
    const answers = await model.findAnswers(question, passage);
    console.log('Answers: ');
    console.log(answers);
}
main();
//# sourceMappingURL=index.js.map