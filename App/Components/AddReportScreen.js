import React, { Component } from 'react'
import { StyleSheet, View, Image, ScrollView, Alert } from 'react-native'
import { FormInput, FormLabel, FormValidationMessage, Button, Text } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { NavigationActions } from 'react-navigation'
import ImagePicker from 'react-native-image-picker'
import api from '../Services/ApiService'

const options = {
  title: 'Carica foto',
  takePhotoButtonTitle: 'Scatta foto',
  chooseFromLibraryButtonTitle: 'Scegli foto da galleria',
  cancelButtonTitle: 'Annulla',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}
const formItems = {
  title: 'Titolo',
  titleErrorMessage: 'Inserisci un titolo per la segnalazione',
  descrErrorMessage: 'Inserisci una descrizione per la segnalazione',
  addressHeader: 'Stai segnalando in',
  descr: 'Descrizione'
}
export default class AddReportScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photoSource: null,
      lat: this.props.navigation.state.params.lat,
      lng: this.props.navigation.state.params.lng,
      nameFile: 'Aggiungi Foto',
      address: 'Caricamento in corso..',
      titleError: false,
      descrError: false,
      title: '',
      description: ''
    }
  }
  convertAddress = (lat, lng) => {
    return api.getAddressFromCoords({ lat, lng }, (error, result) => {
      if (error) {
        console.log(error)
      }
      this.setState({ address: result })
    })
  }
  handleTitle = (title) => {
    this.setState({ title: title })
  }
  handleDescr = (descr) => {
    this.setState({ description: descr })
  }
  componentWillMount () {
    return this.convertAddress(this.state.lat, this.state.lng)
  }
  uploadData () {
    let data = {
      description: this.state.description,
      latitude: this.state.lat,
      longitude: this.state.lng,
      timestamp: new Date().toISOString(),
      title: this.state.title,
      address: this.state.address
    }

    if (this.state.photo) {
      data.photo = this.state.photo
    }
    api.uploadReport(data, (err, res) => {
      let that = this
      if (err == null) {
        Alert.alert('Segnalazione effettuata con successo!', '', [
          { text: 'OK',
            onPress: () => {
              const setParamsAction = NavigationActions.setParams({
                params: { markerId: res },
                key: 'Map'
              })
              that.props.navigation.dispatch(setParamsAction)
              that.props.navigation.popToTop()
            }
          }
        ])
      } else {
        Alert.alert(res.error)
      }
    })
  }

  showAlert = (title) => {
    let that = this
    Alert.alert(
      title,
      '',
      [
        { text: 'OK', onPress: () => { that.props.navigation.goBack() } }
      ],
      { cancelable: false }
    )
  }

  showAlertConfirm = (title) => {
    Alert.alert(
      title,
      '',
      [
        { text: 'Annulla' },
        { text: 'OK', onPress: () => { this.uploadData() } }
      ],
      { cancelable: false }
    )
  }
  imageUpload () {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else if (response.fileSize > 10000000) {
        this.showAlert('Dimensione immagine troppo grande')
      } else if (!(/\/(gif|jpg|jpeg|tiff|png)$/i).test(response.type)) {
        this.showAlert('Estensione immagine non valida')
      } else {
        this.setState({
          photo: response
        })
      }
    })
  }
  render () {
    return (
      <ScrollView style={styles.container_scroll}>
        <View style={styles.container}>
          <FormLabel labelStyle={[styles.title_label, styles.margin_top]}>{formItems.addressHeader}</FormLabel>
          <Text style={styles.place}>{this.state.address}</Text>
          <FormLabel labelStyle={styles.title_label}>{formItems.title}</FormLabel>
          <FormInput accessibilityLabel='inputTitle' testID={'inputTitle'} inputStyle={styles.input} value={this.state.title} onChangeText={this.handleTitle} />
          { this.state.titleError && <FormValidationMessage>{formItems.titleErrorMessage}</FormValidationMessage> }
          <FormLabel labelStyle={[styles.title_label, styles.margin_top]}>{formItems.descr}</FormLabel>
          <FormInput accessibilityLabel='inputDescr' testID={'inputDescr'} inputStyle={[styles.input, styles.input_desc]} value={this.state.descr} onChangeText={this.handleDescr} multiline />
          { this.state.descrError && <FormValidationMessage>{formItems.descrErrorMessage}</FormValidationMessage> }
          <View style={[styles.view_button, styles.margin_top]}>
            <ScrollView horizontal style={{ maxWidth: wp('60%') }}>
              { this.state.photo != null && <FormLabel labelStyle={styles.title_label}>{this.state.photo.title}</FormLabel> }
            </ScrollView>
            <Button accessibilityLabel='button-image'
              testID={'button-image'}
              onPress={() => this.imageUpload()}
              containerViewStyle={{ borderRadius: 40 }}
              buttonStyle={styles.btn_foto}
              title='+' />
          </View>
          { this.state.photo != null && <Image style={{ width: 100, height: 100 }} source={{ uri: 'data:image/jpeg;base64,' + this.state.photo.data }} /> }
          <View style={styles.view_button}>
            <Button
              accessibilityLabel='button-send'
              testID={'button-send'}
              iconRight={{ name: 'md-arrow-round-up', type: 'ionicon', color: 'lightgreen', size: 20 }}
              buttonStyle={[styles.form_button, styles.btn_send]}
              disabled={!(this.state.title && this.state.description)}
              onPress={() => this.showAlertConfirm('Vuoi inviare la segnalazione?')}
              title='Invia' />
          </View>
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container_scroll: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title_label: {
    fontSize: 25,
    marginBottom: wp('5%'),
    maxWidth: wp('80%')
  },
  place: {
    fontSize: 20
  },
  input: {
    width: wp('90%'),
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d6d7da',
    fontSize: 20
  },
  input_desc: {
    maxHeight: hp('10%')
  },
  margin_top: {
    marginTop: wp('5%')
  },
  view_button: {
    flexDirection: 'row',
    marginTop: wp('15%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  form_button: {
    width: wp('80%'),
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn_send: {
    backgroundColor: 'green'
  },
  btn_foto: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: 40,
    backgroundColor: '#BDBDBD'
  }
})
