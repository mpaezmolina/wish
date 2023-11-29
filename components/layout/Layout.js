import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <div className="container">{props.children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
