import { useState } from "react";
import NavBar from "../components/NavBar";
import TopHeader from "../components/TopHeader";
import Footer from "../components/Footer";
import logo from "../assets/Images/turnerscars_logo.png";
import styles from "./VIRT.module.css";
import finance from "../assets/Images/finance.jpg";
import carImg from "../assets/Images/CarFamily.jpg";
import autoImg from "../assets/Images/AutoImg.png";
import uploadPlaceholder from "../assets/Images/uploadPlaceholder.png";
import sedanImg from "../assets/Images/Sedan.png";
import suvImg from "../assets/Images/SUV.png";
import truckImg from "../assets/Images/Truck.png";
import userIcon from "../assets/Images/user.png";
import phoneIcon from "../assets/Images/phone.png";
import locationIcon from "../assets/Images/location.png";

const VIRT = () => {
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(uploadPlaceholder);

// ========######## Handle Upload ########======== //
  const handleUpload = async (e) => {

    // Get Uploaded file
    const file = e.target.files[0];
    if (!file) return;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Generate preview URL for frontend display
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);


    try {
    // ========######## Connect to Backend ########======== //
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: arrayBuffer,
      });

      // Parse JSON response from Azure
      const prediction = await response.json();
      console.log("Full Azure response:", prediction);
      setResult(prediction);
      console.log("Prediction result:", prediction);

      // Extract and lowercase tags from prediction
      if (prediction?.predictions) {
        const tags = prediction.predictions.map((p) => p.tagName.toLowerCase());
      }
    //   Error Handling //
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div>
    {/* ========######## HEADER ########======== */}
      <TopHeader></TopHeader>

    {/* ========######## TOP LOGO SECTION ########======== */}
      <div className={styles.logoBox}>
        <figure className={styles.logoImage}>
            {/* Turners Logo */}
          <img src={logo} alt="turnerslogo" />
        </figure>
        <ul className={styles.infoSection}>
          <li><img src={userIcon} alt="" /><a href="https://www.turners.co.nz/Login/?ReturnUrl=/Cars/finance-insurance/car-insurance/">LOGIN</a> OR <a href="https://www.turners.co.nz/Login/Registration/">REGISTER</a></li>
          <li> <img src={phoneIcon} alt="" /> 0800 887 637</li>
          <li><img src={locationIcon} alt="" /><a href="https://www.turners.co.nz/Company/Branches/">Find Us</a></li>
          <li><a href="https://www.turners.co.nz/Company/Branches/">中文</a></li>
        </ul>
      </div>

    {/* ========######## NAVIGATION BAR ########======== */}
      <NavBar></NavBar>

    {/* ========######## BREADCRUMB NAVIGATOR ########======== */}
      <main className={styles.background}>
        <section className={styles.pageBox}>
          <nav className={styles.breadcrumb}>
            <a href="https://www.turners.co.nz/">Home</a>
            <span>»</span>
            <a href="https://www.turners.co.nz/Cars/">Cars</a>
            <span>»</span>
            <a href="https://www.turners.co.nz/Cars/finance-insurance/">Finance & Insurance</a>
            <span>»</span>
            <a href="https://www.turners.co.nz/Cars/finance-insurance/car-insurance/">Car Insurance</a>
            <span>»</span>
            <a href="#">VIRT</a>
          </nav>

    {/* ========######## HEAD BANNER ########======== */}
          <figure>
            <img className={styles.financeImg} src={finance} alt="" />
          </figure>

    {/* ========######## ABOUT VIRT ########======== */}
          <div className={styles.descriptionBox}>
            <div className={styles.titleBox}>
              <h1>
                Turners Cars: Vehicle Image Recognition Tool (VIRT) – Find the
                Best Insurance Plan for Your Vehicle
              </h1>
            </div>
            <div>
              <p>
                At Turners, we believe getting the right insurance shouldn’t be
                complicated or time-consuming. That’s why we’ve streamlined the
                process to make it as effortless as possible. With our smart
                insurance finder, all you need to do is upload an image of your
                vehicle, and we’ll take care of the rest.
              </p>
            </div>
            <div>
              <p>
                Using cutting-edge recognition and data-matching technology, we
                analyze your vehicle’s details — make, model, condition, and
                more — and instantly connect you with a range of premium
                insurance deals tailored specifically to your car. Whether
                you’re after full cover, third-party, or the best value for
                everyday driving, we’ll source competitive quotes from trusted
                providers across New Zealand.
              </p>
            </div>
            <div>
              <p>
                There’s no need to fill in endless forms or waste time comparing
                providers manually. Our system does the hard work for you —
                delivering real-time results, price comparisons, and coverage
                breakdowns, so you can choose the option that best suits your
                needs and budget.
              </p>
            </div>

        {/* ========######## HERO IMAGE ########======== */}
            <figure>
              <img className={styles.carImg} src={carImg} alt="" />
            </figure>

        {/* ========######## WHY TURNERS VIRT ########======== */}
            <div className={styles.titleBox}>
              <h1>Why use Turners VIRT?</h1>
            </div>
            <div className={styles.whyList}>
              <ul>
                <li>Upload once, compare instantly</li>
                <li>Personalized deals based on your actual vehicle</li>
                <li>Access to top NZ insurers</li>
                <li>No hidden fees or obligations</li>
                <li>Optimized for both new and used cars</li>
              </ul>
              <figure>
                <img className={styles.autoImg} src={autoImg} alt="" />
              </figure>
            </div>
            <div>
              <p>
                Whether you’ve just bought a car or you’re looking to switch to
                a better deal, Turners makes insurance simple. Upload your
                vehicle image today and let us find you the coverage you
                deserve.
              </p>
            </div>
          </div>

        {/* ========######## UPLOAD SECTION ########======== */}
          <div className={styles.uploadImgContainer}>
            <figure className={styles.uploadImgBox}>
              <img className={styles.uploadPlaceholder} src={preview} alt="" />
            </figure>
            <div className={styles.uploadBtn}>
              <h3>Upload an image to get a prediction</h3>
              <input type="file" accept="image/*" onChange={handleUpload} />
            </div>
          </div>

        {/* ========######## VIRT PREMIUM CALCULATION ########======== */}
          <div className={styles.predictionContainer}>
            {/* Checks if predictions exist before rendering analysis */}
            {result?.predictions && (
              <div className={styles.analysisBox}>
                <div className={styles.insurance}>

                  {/* Render Premium image based on vehicle type tag present */}
                  {result?.predictions &&
                    (() => {
                      const tags = result.predictions
                        .sort((a, b) => b.probability - a.probability)
                        .slice(0, 4)
                        .map((p) => p.tagName.toLowerCase());
                      if (tags.includes("sedan"))
                        return <img src={sedanImg} alt="sedan" />;
                      if (tags.includes("suv"))
                        return <img src={suvImg} alt="suv" />;
                      if (tags.includes("truck"))
                        return <img src={truckImg} alt="truck" />;
                      return null;
                    })()}
                  
                  {/* Shows top 4 predictions */}
                  <div className={styles.predictionResults}>
                    <h4>VIRT Analysis:</h4>
                    <ul>
                      {result.predictions
                        .sort((a, b) => b.probability - a.probability)
                        .slice(0, 4)
                        .map((pred, index) => (
                          <li key={index}>
                            {pred.tagName} —{" "}
                            {Math.round(pred.probability * 100)}%
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

        {/* ========######## FOOTER ########======== */}
          <Footer></Footer>
        </section>
      </main>
    </div>
  );
};

export default VIRT;
