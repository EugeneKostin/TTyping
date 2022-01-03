const getRandomText = async () => {
    try {
        //const numParagraphs = Math.floor(Math.random() * 6) + 1
        const numParagraphs = 1;

        const textData = await fetch(`https://baconipsum.com/api/?type=meat-and-filler&paras=${numParagraphs},start-with-lorem: 0`);
        let text = await textData.json();
        // console.log(text)
        return text;
        // return 'test data'
    } catch (e) {
        console.error('API ERROR: ', e)
        //return err
    }
};

export default getRandomText;