// NODE MODULES...
import React from 'react';

// COMPONENTS...
import PageTitle from './components/PageTitle';
import TopAppBar from './components/TopAppBar';

function App() {
  return (
    <>
      {/* META TITLE */}
      <PageTitle title='Phoenix = chat to supercharge your ideas' />

      <div className=''>
        {/* SIDEBAR */}
        <div className=''>
          {/* TOP-APP-BAR */}
          <TopAppBar />

          {/* MAIN-CONTENT */}
          <div className=''>
            <div className=''></div>
          </div>

          {/* PROMPT FIELD */}
          <div className=''>
            <p className=''>
              Phoenix may display inaccurate info, including about people, so
              double-check its responses.
              <a
                href='https://support.google.com/gemini?p=previcy_notice'
                target='_blank'
                className=''
              >
                Your privacy & Gemini Apps
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
