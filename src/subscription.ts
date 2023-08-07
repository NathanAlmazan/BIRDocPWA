const convertedVapidKey = urlBase64ToUint8Array('BNKqAlyLaJyWEodJnlPQTxq84VGgyOxnWgi48zEmCuuz8qDPsO_l_5F4Z5jP2p4U_dpTGpnNX2Tr5oA92YHxk1w');

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function sendSubscription(subscription: PushSubscription, uid: string) {
  return fetch(`${process.env.REACT_APP_SUBSCRIBE_URL}/${uid}`, {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export default function subscribeUser(uid: string) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function(registration) {

            if (!registration.pushManager) {
                console.log('Push manager unavailable.')
                return
            }

            registration.pushManager.getSubscription().then(function(existedSubscription) {
                if (existedSubscription === null) {
                    console.log('No subscription detected, make a request.')

                    registration.pushManager.subscribe({
                        applicationServerKey: convertedVapidKey,
                        userVisibleOnly: true,
                    }).then(function(newSubscription) {
                        console.log('New subscription added.', newSubscription)
                        sendSubscription(newSubscription, uid)
                    }).catch(function(e) {
                        if (Notification.permission !== 'granted') {
                            console.log('Permission was not granted.')
                        } else {
                            console.error('An error ocurred during the subscription process.', e)
                        }
                    })

                } else {
                    console.log('Existed subscription detected.');
                    sendSubscription(existedSubscription, uid);
                }
            })
        })
        .catch(function(e) {
            console.error('An error ocurred during Service Worker registration.', e)
        })
    }
}