module.exports = ({sujet, message}) => {
    const mail = `
      <!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Un nouveau message pour vous Hermes</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style>
        body {
            width: 600px;
            margin: 0 auto;
            padding: 0;
        }

        table {
            border: none;
        }

        td {
            color: #00205A;
            font-family: Arial, Helvetica, sans-serif;
            text-align: center;
        }

        p {
            margin: 0;
        }

        #header {
            background-color: #39414f;
        }

        .logo {
            width: 38%;
            height: 100%;
            display: block;
            margin: 0 auto;
        }

        .metiers {
            padding: 0 5px 0 5px !important;
        }
    </style>
</head>

<body style="width:600px; margin: 0 auto; padding: 0;">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: none;">
                <tr id="header" bgcolor="#00205A"
                    background='#39414f'
                >
                    <td align="center"
                        style="text-align:center;padding:30px 0 30px 0; color: #FFFFFF; font-size: 19px; font-weight: bold; font-family: Arial, sans-serif;text-shadow: 2px 2px 2px #000000;">

                        <p style="text-align: center;"><img class="logo"
                                                            src="https://i.imgur.com/POGFL6I.png"
                                                            width="38%" height="100%"
                                                            style="width: 38%; height:100%; display:block; padding: 10px 0 0 0!important;">
                        </p>
                    </td>
                </tr>
                <tr style="background-color: #e9e7e1;">
                    <td style="padding: 20px 16px 20px 16px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td>
                                <h1>${sujet}</h1>
                                <h2>${message}</h2>
                                </td>
                            </tr>



                <tr>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%"
                           style="background-color: #f47173; padding: 20px 30px">
                        <tr>
                            <td width="38%" align="center">
                                <img class="logo"
                                     src="https://i.imgur.com/7iXYgAI.png"
                                     width="38%" height="100px"
                                     style="width: 38%; height:100px; object-fit: cover; display:block; ">
                            </td>

                        </tr>
                    </table>
                </tr>
            </table>
        </td>
    </tr>
</table>

</body>

</html>`;
    return mail;
};
