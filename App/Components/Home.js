import React, { Component } from 'react'
import { Button, Container, Content, Footer, FooterTab, Icon, Text } from 'native-base'
import Login from './Login'
import { View, StyleSheet, ScrollView } from 'react-native'

export default class Home extends Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <ScrollView ref={(node) => this.scroll = node}>
          <Content>
            <Login navigation={this.props.navigation} />
            <View style={styles.scroll_down}>
              <Button transparent onPress={() => { this.scroll.scrollTo({ y: 610, animated: true }) }}>
                <Text style={styles.color}>Scorri per più informazioni </Text>
              </Button>
              <Icon style={[styles.color, styles.icon]} name='ios-arrow-down' />
            </View>
            <View style={styles.container}>
              <Text style={styles.text}>
                Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa.
                Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando
                un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo
                campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla
                videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60,
                con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi
                del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che
                includeva versioni del Lorem Ipsum.
                Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa.
                Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando
                un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo
                campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla
                videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60,
                con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi
                del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che
                includeva versioni del Lorem Ipsum.
                Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa.
                Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando
                un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo
                campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla
                videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60,
                con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi
                del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che
                includeva versioni del Lorem Ipsum.
              </Text>
            </View>
          </Content>
          <Footer>
            <FooterTab>
              <Button full onPress={() => { navigate('TabNavigator') }}>
                <Text style={styles.text_footer} primary >Prova Demo</Text>
              </Button>
            </FooterTab>
          </Footer>
        </ScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text_footer: {
    fontSize: 15,
    color: 'white'
  },
  text: {
    fontSize: 20
  },
  scroll_down: {
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  color: {
    color: 'black'
  },
  icon: {
    fontSize: 40
  }
})
