// heaader isimli fonksiyon app fonksiyonunun childi oldu parent ise app fonksiyonu header fonksiyonunu çağırır.



export default function Header({ children }) {
  return (
    <div id="header">
      <nav
        className="navbar navbar-expand-lg bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container d-flex justify-content-center align-items-center text-center">
          {children}
        </div>
      </nav>
    </div>
  );
}
