import * as firebase from 'firebase'
import * as $q from 'q'

firebase.initializeApp({
  apiKey: 'AIzaSyC98sf66h4oI13Q_BJxLzJeM4DtIJt8008',
  authDomain: 'cuc-dev.firebaseapp.com',
  databaseURL: 'https://cuc-dev.firebaseio.com',
  storageBucket: 'gs://cuc-dev.appspot.com/'
})

const storage = firebase.storage()

export default class PhotoUploadService {

  // TODO: Progress spinner
  static uploadFirebase (formData) {
    const photos = formData.getAll('photos')
    return new Promise((resolve, reject) => {
      let promises = PhotoUploadService.iterateAndUploadPhotos(photos)
      $q.all(promises)
        .then(uploadTasksSnapshots => resolve(PhotoUploadService.convertResultPhotos(uploadTasksSnapshots)))
        .catch(err => reject(err))
    })
  }

  static iterateAndUploadPhotos (photos) {
    let promises = []
    // Create a root reference
    let storageRef = storage.ref()
    for (let photo of photos) {
      // Create a reference to 'public/image.jpg'
      let imageFullRef = storageRef.child('public/' + photo.name)
      // Insert image type
      let metadata = {
        contentType: photo.type
      }
      // Upload the file and metadata
      let uploadTask = imageFullRef.put(photo, metadata)
      promises.push(uploadTask.promise_)
    }
    return promises
  }

  // TODO: Improve with filter and map
  static convertResultPhotos (uploadTasksSnapshots) {
    let photos = []
    uploadTasksSnapshots.forEach(function (uts) {
      photos.push({
        name: PhotoUploadService.splitExtension(uts.metadata.name),
        url: uts.downloadURL
      })
    }, this)
    return photos
  }

  static splitExtension (fileName) {
    return fileName.slice(0, (fileName.lastIndexOf('.')))
  }
}
