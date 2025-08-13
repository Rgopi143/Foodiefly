import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

const formatINR = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

const Restaurant = () => {
  return (
    <>
      <HeroSection />
      {/* ...existing restaurant page content... */}
      <Footer />
    </>
  );
};

export default Restaurant;