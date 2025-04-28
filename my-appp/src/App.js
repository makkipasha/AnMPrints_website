import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Login from './components/Login';
import Footer2 from './components/Footer2';
import Signup from './components/Signup';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import ProductDetailPage from './components/ProductDetailPage';
import ProcessPage from './components/ProcessPage';
import CartPage from './components/CartPage';
import AboutPage from './components/AboutPage';
import Faq from './components/Faq';
import CategoryPage from './components/CategoryPage';
import Category1Page from './components/Category1Page';
import Category2Page from './components/Category2Page';
import Category3Page from './components/Category3Page';
import Category4Page from './components/Category4Page';
import Category5Page from './components/Category5Page';
import ProductDetail1 from './components/ProductDetail1';
import ProductDetail2 from './components/ProductDetail2';
import AddBlog from './Admin/AddBlog';

import AdminLogin from './Admin/AdminLogin';
import DashboardPage from './Admin/DashboardPage';
import AllUsersPage from './Admin/AllUsersPage';
import CategoriesPage from './Admin/CategoriesPage';
import StockPage from './Admin/StockPage';
import ProductsPage from './Admin/ProductsPage';
import Stock_2Page from './Admin/Stock_2Page';
import Sidebar from './Admin/Sidebar';
import Stock_3Page from './Admin/Stock_3Page';
import Stock_4Page from './Admin/Stock_4Page';
import AccessoriesPage from './Admin/AccessoriesPage';
import AccessoriesPage2 from './Admin/AccessoriesPage2';
import OrderPage from './Admin/OrderPage';
import PrivateRoute from './Admin/PrivateRoute';
import Logout from './Admin/Logout';
import BannerPage from './Admin/BannerPage';
import HeadlinePage from './Admin/HeadlinePage';
import MerchandisePage_2 from './Admin/MerchandisePage_2';
import ApplyCouponPage from './Admin/ApplyCouponPage';
import Profile from './components/Profile';
import AddBlogPage from './Admin/AddBlogPage';
import BlogPage from './components/BlogPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import Refund_Return_Shipping_Policy from './components/Refund_Return_Shipping_Policy';
import Terms from './components/Terms';
import ReviewPage from './Admin/ReviewPage';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="647246143262-4kth0ruauur8djasicj2emobh3ljfmds.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/login" element={<><Login /><Footer2 /></>} />
          <Route path="/signup" element={<><Signup /><Footer2 /></>} />

          <Route path="/" element={<HomePage />} /> 
          <Route path="/products" element={<ProductPage />} /> 
          <Route path="/products/detail" element={<ProductDetailPage />} /> 
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/process" element={<ProcessPage />} /> 
          <Route path="/cart" element={<CartPage />} /> 
          <Route path="/about" element={<AboutPage />} /> 
          <Route path="/blogs" element={<BlogPage />} /> 


          <Route path="/faq" element={<><Header /><Faq /><Footer2 /></>} />
          <Route
  path="/products/detail1/:id"
  element={
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: 1 }}>
        <ProductDetail2 />
      </div>
      <Footer2 />
    </div>
  }
/>
<Route
  path="/terms&condition"
  element={
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: 1 }}>
        <Terms />
      </div>
      <Footer2 />
    </div>
  }
/>

<Route
  path="/privacy-policy"
  element={
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: 1 }}>
        <PrivacyPolicy />
      </div>
      <Footer2 />
    </div>
  }
/>
<Route
  path="/refund-policy"
  element={
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: 1 }}>
        <Refund_Return_Shipping_Policy />
      </div>
      <Footer2 />
    </div>
  }
/>

<Route
  path="/products/detail/:id"
  element={
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: 1 }}>
        <ProductDetail1 />
      </div>
      <Footer2 />
    </div>
  }
/>

          <Route path="/category/2" element={<Category1Page />} />
          <Route path="/category/6" element={<Category2Page />} />
          <Route path="/category/8" element={<Category3Page />} />
          <Route path="/category/4" element={<Category4Page />} />
          <Route path="/category/5" element={<Category5Page />} />


          <Route path="/accessories/cutomize" element={<AccessoriesPage2 />} />
          <Route path="/add/cutomize/accessories" element={<Stock_4Page />} />
          <Route path="/merchandise" element={<MerchandisePage_2 />} />\
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/addblog" element={<PrivateRoute><AddBlogPage /></PrivateRoute>} />
          
          <Route path="/reviews" element={<PrivateRoute><ReviewPage /></PrivateRoute>} />
          <Route path="/coupons" element={<PrivateRoute><ApplyCouponPage /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/headline" element={<PrivateRoute><HeadlinePage /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><AllUsersPage /></PrivateRoute>} />
          <Route path="/categories" element={<PrivateRoute><CategoriesPage /></PrivateRoute>} />
          <Route path="/stock-management" element={<PrivateRoute><StockPage /></PrivateRoute>} />
          <Route path="/stocks" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
          <Route path="/accessory" element={<PrivateRoute><Stock_2Page /></PrivateRoute>} />
          <Route path="/accessories" element={<PrivateRoute><AccessoriesPage /></PrivateRoute>} />
          <Route path="/add/cutomize/product" element={<PrivateRoute><Stock_3Page /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
          <Route path="/add-banner" element={<PrivateRoute><BannerPage /></PrivateRoute>} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
