import { useState } from "react";
import axios from "axios";
import "./App.css";
import "./index.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [creating, setCreating] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await axios.post('https://insta-reel-server.onrender.com/reel-download', {
        url,
      });

      if (response.status === 200) {
        setVideoSrc(response.data.proxyUrl);
      } else {
        console.error('Error downloading video');
      }

      setCreating(true);
    } catch (error) {
      console.error('Error downloading video:', error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <div className="text-slate-50 h-16 m-auto flex items-center justify-center shadow-lg">
        <h1 className="logo-font bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-transparent bg-clip-text text-4xl p-6 mb-2">
          IGRS
        </h1>
      </div>
      <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 h-screen flex items-center justify-center pt-32">
        <div className="w-full sm:w-96 mb-32 h-auto bg-gray-100 p-6 rounded-md shadow-md">
          <input
            className="w-full px-4 py-2 mb-4 border rounded-md"
            type="text"
            placeholder="Enter video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={handleDownload}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Download
            {creating && (
              <span className="mt-1 ml-3 loading loading-spinner loading-xs"></span>
            )}
          </button>
          {videoSrc && (
            <div className="mt-4">
              <p className="mb-2 text-lg font-semibold">Video Source:</p>
              <div className="aspect-w-9 aspect-h-16">
                <video className="w-full h-full" src={videoSrc} controls>
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
