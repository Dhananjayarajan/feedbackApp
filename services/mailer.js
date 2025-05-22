const formData = require('form-data');
const Mailgun = require('mailgun.js');

require('dotenv').config();

class Mailer {
  constructor({ subject, recipients }, content) {
    const mailgun = new Mailgun(formData);
    this.client = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_KEY,
    });

    this.domain = process.env.MAILGUN_DOMAIN;

    this.data = {
      from: 'Feedback App <postmaster@sandbox6f831c7fa87e4d89978b84c51eb2c404.mailgun.org>',
      to: this.formatAddresses(recipients),
      subject: subject,
      html: content,
    };
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => email).join(',');
  }

  async send() {
    try {
      const response = await this.client.messages.create(this.domain, this.data);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Mailer;
