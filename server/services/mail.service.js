exports.getMailOptions = (email, confirmationLink) => ({
    from: 'abdul.hayan@devsinc.com',
    to: email,
    subject: 'Confirm Email',
    html: `Click <a href="${confirmationLink}">here</a> to confirm your email.`,

})