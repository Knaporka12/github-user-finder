import { Transition } from 'react-transition-group'

const UserProfile = ({ userData, fetchError, isLoading, transitionState }) => {

  const transitions = {
    entering: {
      opacity: 0,
      transform: 'translateX(-700px)'
    },
    entered: {
      opacity: 1,
      transform: 'translateX(0px)'
    },
    exiting: {
      opacity: 0,
      transform: 'translateX(700px)'
      
    },
    exited: {
      opacity: 0,
      transform: 'translateX(0px)'
    }
  };

  return (

    <main className='main'>

      {(!userData && !fetchError) &&
        <h2 className='main__h2'>Type in a username and click the button above</h2>
      }

      <Transition in={transitionState} timeout={300}> 

      {(state) => {

        return (

        <section  className='main__section' style={{

          transition: 'all .3s', 
			    opacity: 0,
			    ...transitions[state]

			  }}>

          {(fetchError) &&
            fetchError === 'Not Found'
            ? <h2 className='main__h2' style={{ color: 'red' }}>A user with this name does not exist</h2>
            : <h2 className='main__h2' style={{ color: 'red' }}>{fetchError}</h2>
          }

          {(!fetchError && userData) &&

            <>

              <figure className='main__figure'>
                <img src={userData.avatar_url} alt={`${userData.login} profile picture`} className='main__img' />
              </figure>

              <h3 className='main__h3'>{userData.login}</h3>

              <p className='main__para'>Accout created at: <span>{userData.created_at.slice(0, 10)}</span></p>

              <div className='main__container--para'>
                <p className='main__para'>Followers: <span>{userData.followers}</span></p>
                <p className='main__para'>Following: <span>{userData.following}</span></p>
              </div>

              <div className='main__container--para'>
                <p className='main__para'>Public Repositories: <span>{userData.public_repos}</span></p>
                <p className='main__para'>Public Gists: <span>{userData.public_gists}</span></p>
              </div>

              <p className='main__para'>Email: <span>{userData.public_email ? userData.public_email : <>not provided</>}</span></p>

              <p className='main__para'>Company: <span>{userData.company ? userData.company : <>not provided</>}</span></p>

              <p className='main__para'>Link to Github profile:
                <a href={userData.html_url} target='blank'> {userData.html_url} </a>
              </p>

            </>

          }

        </section>
      
      )}}

      </Transition>

    </main>

  )

}

export default UserProfile
