import Header from '../components/Header';
import Footer from '../components/Footer';
import DummyTextGenerator from '../components/DummyTextGenerator';

const DummyTextGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header />
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Dummy Text Generator</h2>
            <DummyTextGenerator />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DummyTextGeneratorPage; 