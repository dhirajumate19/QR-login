import "./qrLoginPage.css";
import logo from "../assets/logo.png";
import QRCode from "qrcode.react";
const QRLoginPage = () => {
  return (
    <>
      <div className="conatiner">
        <div className="header">
          <img src={logo} alt="Whatsapp" className="logo"></img>
          <h1>WhatsApp Web</h1>
        </div>

        <div className="conatiner-content">
          <div className="downloadsection">
            <h2>Download Whatsapp for Windows</h2>
            <button className="downloadButton">Get the App</button>
          </div>
          <div className="instructionqr-content">
            <div className="instruction">
              <h2>Use Whatsapp on your Computer</h2>
              <ol>
                <li>Open Whatsapp on your computer</li>
                <li>
                  Tap Menu <span>:</span> on Android, or setting<span></span> o
                  iPhone{" "}
                </li>
                <li>Tap Linked Devices and then link a device</li>
                <li>Point your phone at this screen to capture the QR code</li>
              </ol>
            </div>
            <div className="qrcode">
              <QRCode value="https://web.whatsapp.com" size={200}></QRCode>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default QRLoginPage;
