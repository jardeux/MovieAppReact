import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Footer() {
  const decorationNone = { textDecoration: "none" };
  const {theme} = useContext(ThemeContext);
  
  return (
    <footer className={`bg-${theme} text-${theme === "dark" ? "light" : "dark"} pt-5 pb-4`}>
      <div className="text-center text-md-left">
        <div className="row text-center text-md-left">
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
              MovieApp
            </h5>
            <p>
              MovieApp, kullanıcılarına en iyi film deneyimini sunmayı
              hedefleyen bir platformdur.
            </p>
          </div>

          <div className={`col-md-3 col-lg-2 text-${theme === "dark" ? "light" : "dark"} col-xl-2 mx-auto mt-3`}>
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
              Faydalı Linkler
            </h5>
            <p>
              <a href="#" className={`text-${theme === "dark" ? "light" : "dark"}`} style={decorationNone}>
                Hesabım
              </a>
            </p>
            <p>
              <a href="#" className={`text-${theme === "dark" ? "light" : "dark"}`} style={decorationNone}>
                Yardım
              </a>
            </p>
            <p>
              <a href="#" className={`text-${theme === "dark" ? "light" : "dark"}`} style={decorationNone}>
                Gizlilik Politikası
              </a>
            </p>
            <p>
              <a href="#" className={`text-${theme === "dark" ? "light" : "dark"}`} style={decorationNone}>
                İletişim
              </a>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
              İletişim
            </h5>
            <p>
              <i className="fas fa-home mr-3"></i> İstanbul, Türkiye
            </p>
            <p>
              <i className="fas fa-envelope mr-3"></i> info@movieapp.com
            </p>
            <p>
              <i className="fas fa-phone mr-3"></i> +90 555 123 45 67
            </p>
            <p>
              <i className="fas fa-print mr-3"></i> +01 234 567 89
            </p>
          </div>
        </div>

        <hr className="mb-4" />

        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-md-left text-center">
              Telif Hakkı ©2025 Tüm Hakları Saklıdır
              <a href="#" style={decorationNone}>
                <strong className="text-warning">MovieApp</strong>
              </a>
            </p>
          </div>

          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-right">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a
                    href="#"
                    className={`btn-floating btn-sm text-${theme === "dark" ? "light" : "dark"}`}
                    style={{ fontSize: "23px" }}
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="#"
                    className={`btn-floating btn-sm text-${theme === "dark" ? "light" : "dark"}`}
                    style={{ fontSize: "23px" }}
                  >
                    <i className="bi bi-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="#"
                    className={`btn-floating btn-sm text-${theme === "dark" ? "light" : "dark"}`}
                    style={{ fontSize: "23px" }}
                  >
                    <i className="bi bi-linkedin"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="#"
                    className={`btn-floating btn-sm text-${theme === "dark" ? "light" : "dark"}`}
                    style={{ fontSize: "23px" }}
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
