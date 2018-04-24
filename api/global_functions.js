housePics = ['front', 'hall', 'bedroom', 'badroom', 'kitchen', 'kitcken_diningroom', 'diningroom',
  'living', 'sink', 'tender', 'gallery', 'grill', 'gazebo', 'patio', 'hallway', 'garage'];

// =============================================================================

processInmueblePhotos = function (inmuebleId, body) {

  housePics.forEach(function (property) {
    if (body.pics.hasOwnProperty(property) && body.pics[property].changed) {
      InmueblesPhotos.upsert(inmuebleId, property, body.pics[property]);
    }
  });
  delete body.pics;

  return body;
}

getInmueblePhotos = function (row) {
  var emptyPic = {pic: null, obs: null};
  var pics = {};
  housePics.forEach(function (prop) {
    pics[prop] = emptyPic;
  });

  if (row.pics) {
    var picsToProcess = row.pics.split(',');

    picsToProcess.forEach(function(val) {
      var fields = val.split('|');
      var type = fields[0].split(':')[1];
      pics[type] = {
        pic: fields[1].split(':')[1],
        obs: fields[2].split(':')[1]
      };
    });
  }

  return pics;
}
