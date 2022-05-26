import { useState } from 'react';
import { BsHash } from 'react-icons/bs';
import { FaChevronDown, FaChevronRight, FaPlus } from 'react-icons/fa';

const TAF = ['Morticia', 'Gomez'];
const mooneys = ['Joe', 'Beck', 'Fat dude'];
const anavrin = ['Love', 'Forty', 'Gay Black Dude'];

const BookmarkBar = () => {
  return (
    <div className='bookmark-bar w-0 shadow-lg'>
      <ChannelBlock />
      <div className='bookmark-container'>
        <Dropdown header='The Addams Family' selections={TAF} />
        <Dropdown header='Mooneys' selections={mooneys} />
        <Dropdown header='Anavrin' selections={anavrin} />
      </div>
    </div>
  );
};

const Dropdown = ({ header, selections }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='dropdown'>
      <div onClick={() => setExpanded(!expanded)} className='dropdown-header'>
        <ChevronIcon expanded={expanded} />
        <h5
          className={
            expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'
          }
        >
          {header}
        </h5>
        <FaPlus
          size='12'
          className='text-accent text-opacity-80 my-auto ml-auto'
        />
      </div>
      {expanded &&
        selections &&
        selections.map((selection) => <TopicSelection selection={selection} />)}
    </div>
  );
};

const ChevronIcon = ({ expanded }) => {
  const chevClass = 'text-accent text-opacity-80 my-auto mr-1';
  return expanded ? (
    <FaChevronDown size='14' className={chevClass} />
  ) : (
    <FaChevronRight size='14' className={chevClass} />
  );
};

const TopicSelection = ({ selection }) => (
  <div className='dropdown-selection'>
    <BsHash size='24' className='text-gray-400' />
    <h5 className='dropdown-selection-text'>{selection}</h5>
  </div>
);

const ChannelBlock = () => (
  <div className='bookmark-block'>
    <h5 className='bookmark-block-text'>Bookmarks</h5>
  </div>
);

export default BookmarkBar;
