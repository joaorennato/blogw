import styled from 'styled-components/native';
import HTML from 'react-native-render-html';

export const Loading = styled.ActivityIndicator.attrs({
    size: 'small',
    color: '#444'
})`
    margin: 30px;
`;

export const Container = styled.SafeAreaView`
    flex: 1;

    background-color: #FFFFFF;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    width: 100%;
`;

export const PostArea = styled.View`
    flex: 1;
    width: 100%;
`;

export const TituloArea = styled.View`
    width: 100%;
    padding: 0 10px;
`;

export const Titulo = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #000;
    margin-top: 5px;
`;

export const FeaturedImage = styled.Image.attrs({
    resizeMode: 'cover'
})`
    width: 100%;
    height: 250px;
`;

export const ConteudoArea = styled.View`
    width: 100%;
    padding: 10px 10px 50px 10px;
`;

export const HtmlArea = styled(HTML)``;

export const Conteudo = styled(HtmlArea).attrs({
    tagsStyles: {
        p: {
            fontSize: 16,
            textAlign: 'left'
        },
        a: {
            color: '#444',
            fontWeight: 'bold',
            textDecorationLine: 'none'
        }
    }
})`

`;
