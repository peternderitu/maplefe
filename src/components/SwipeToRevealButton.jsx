import { useState } from 'react';
import Cookies from 'js-cookie';
import { SwipeableButton } from 'react-swipeable-button';
import UserNotLoggedIn from '@/pages/user/UserNotLoggedIn';
import StudentEmailNotConfirmed from './StudentEmailNotConfirmed';

const SwipeToRevealButton = ({ showDeal, setShowDeal, user }) => {
  let token = Cookies.get('token');
  const [open, setOpen] = useState(false);
  const [openSENC, setOpenSENC] = useState(false);
  const [action, setAction] = useState('create a deal');

  const onSuccess = () => {
    setAction('view deal details');
    token && user.studentEmailVerified === 1
      ? setShowDeal(true)
      : token && user.studentEmailVerified === 0
      ? setOpenSENC(true)
      : setOpen(true);
  };

  // if (isLoadingUser) return <p>Loading...</p>;
  return (
    <>
      <UserNotLoggedIn open={open} setOpen={setOpen} action={action} />
      <StudentEmailNotConfirmed
        open={openSENC}
        setOpen={setOpenSENC}
        action={action}
        userId={user ? user.id : null}
      />
      <div className={showDeal ? 'hidden' : 'block'}>
        <div className='w-[350px] h-[100px] bg-white mx-auto'>
          {console.log(showDeal)}
          <SwipeableButton
            onSuccess={onSuccess}
            text='Swipe to access deal!'
            text_unlocked='Login to access deal'
            color='#F81542'
          />
        </div>
      </div>
    </>
    // On success We can make the slider disappear and the button or coupon code appear
    // But first check if user is logged in, if they aren't display not logged in modal
  );
};

export default SwipeToRevealButton;
