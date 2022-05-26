import TopNavigation from '../TopNavigation';
import { ToggleOffAll } from '../SideBar/Toggles';
import SideBar from '../SideBar';
// import { useState } from 'react';

const ContentContainer = () => {
  return (
    <div className='content-container'>
      <div className='content-main'>
        <div className='content-list' onClick={ToggleOffAll}>
          <Post
            name='Ada'
            timestamp='one week ago'
            text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.`}
          />
          <Post
            name='Leon'
            timestamp='one week ago'
            text={`Lorem ipsum dolor. `}
          />
          <Post name='Jill' timestamp='5 days ago' text={`Lorem.`} />
          <Post
            name='Ellie'
            timestamp='4 days ago'
            text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. `}
          />
          <Post
            name='Chris'
            timestamp='4 days ago'
            text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.
          
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.`}
          />
          <Post
            name='Claire'
            timestamp='2 days ago'
            text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. `}
          />
          <Post
            name='Albert'
            timestamp='22 hours ago'
            text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. ☺️ `}
          />
          <Post
            name='Rebecca'
            timestamp='3 hours ago'
            text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit.`}
          />
          <Post
            name='H.U.N.K'
            timestamp='Just now'
            text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.`}
          />
        </div>
        <SideTab />
        <SideBar />
        {/* <TopNavigation /> */}
      </div>
      {/* <BottomBar /> */}
    </div>
  );
};

// const BottomBar = () => (
//   <div className='bottom-bar'>
//     <PlusIcon />
//     <input
//       type='text'
//       placeholder='Enter message...'
//       className='bottom-bar-input'
//     />
//   </div>
// );
const SideTab = () => (
  <div className='side-tab' onClick={ToggleOffAll}>
    <RecentFollowers />
    <Trending />
  </div>
);
const RecentFollowers = () => (
  <div className='recent-followers'>
    <h5 className='channel-block-text'>Recent followers</h5>
  </div>
);
const Trending = () => (
  <div className='trending'>
    <h5 className='channel-block-text'>#Trending</h5>
  </div>
);
const Post = ({ name, timestamp, text }) => {
  const seed = Math.round(Math.random() * 100);
  return (
    <div className={'post'} onClick={ToggleOffAll}>
      <div className='avatar-wrapper'>
        <img
          src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
          alt=''
          className='avatar'
        />
      </div>

      <div className='post-content'>
        <p className='post-owner'>
          {name}
          <small className='timestamp'>{timestamp}</small>
        </p>
        <p className='post-text'>{text}</p>
      </div>
    </div>
  );
};

export default ContentContainer;
