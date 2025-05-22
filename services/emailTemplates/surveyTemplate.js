require('dotenv').config()

module.exports = (survey) => {
  return `
    <html>
      <head>
        <style>
          .container {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
          }
          .question {
            font-size: 20px;
            margin-bottom: 30px;
          }
          .button {
            display: inline-block;
            margin: 0 10px;
            padding: 12px 24px;
            font-size: 16px;
            color: white;
            background-color: #28a745;
            text-decoration: none;
            border-radius: 6px;
          }
          .button.no {
            background-color: #dc3545;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="question">
            ${survey.body}
          </div>
          <a class="button" href="${process.env.REDIRECT_DOMAIN}/api/surveys/thanks">Yes</a>
          <a class="button no" href="${process.env.REDIRECT_DOMAIN}/api/surveys/thanks">No</a>
        </div>
      </body>
    </html>
  `;
};
