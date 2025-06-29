// controllers/ussdController.js

exports.handleUSSD = async (req, res) => {
  const { text, phoneNumber, sessionId } = req.body;
  let response = '';

  const textArray = text.split('*');

  switch (textArray.length) {
    case 1:
      response = `CON Welcome to AgriMashinani
1. Register
2. Advisory
3. Weather`;
      break;

    case 2:
      if (textArray[1] === '1') {
        response = 'CON Please enter your full name:';
      } else if (textArray[1] === '2') {
        response = 'CON Please enter your farming advisory query:';
      } else if (textArray[1] === '3') {
        // Ideally integrate your weather module here
        response = 'END Today is sunny with highs of 27°C.';
      } else {
        response = 'END Invalid option.';
      }
      break;

    case 3:
      if (textArray[1] === '1') {
        const fullName = textArray[2];
        // Save user to DB here if needed
        response = `END Thank you ${fullName}, you have been registered.`;
      } else if (textArray[1] === '2') {
        const advisoryQuery = textArray[2];
        // For MVP: return static advisory, later integrate AI module here
        response = `END Advisory: Ensure good spacing and apply fertiliser adequately.`;
      } else {
        response = 'END Invalid input.';
      }
      break;

    default:
      response = 'END Invalid input.';
      break;
  }

  res.set('Content-Type: text/plain');
  res.send(response);
};
