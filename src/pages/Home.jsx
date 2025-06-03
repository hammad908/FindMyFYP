import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import HeroSection from '../components/layouts/views/home/HeroSection';
import HowItWorks from '../components/layouts/views/home/HowItWorks';
import SupervisorHighlights from '../components/layouts/views/home/SupervisorHighlights';
import CallToAction from '../components/layouts/views/home/CallToAction';
import StudentFeedback from '../components/layouts/views/home/StudentFeedback';
import Footer from '../components/layouts/Footer';
import CardLayout from '../components/layouts/views/home/CardLayout';
import SectionContainer from '../components/layouts/views/home/SectionContainer';
import InfoBox from '../components/layouts/views/home/InfoBox';
import SupervisorCard from '../components/layouts/views/home/SupervisorCard';

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [initialRedirectDone, setInitialRedirectDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && !initialRedirectDone) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const role = userDoc.exists() ? userDoc.data().role?.toLowerCase() : null;


        
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate, initialRedirectDone]);

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <main>
      <HeroSection />
      <SectionContainer />
      <CardLayout />
      <SupervisorHighlights />
      <HowItWorks />
      <CallToAction />
      <StudentFeedback />
      <SupervisorCard />
      <InfoBox />
      <Footer />
    </main>
  );
};

export default Homepage;
