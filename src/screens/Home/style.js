import HTML from 'react-native-render-html';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    width: 100%;
`;

export const InnerArea = styled.View`
    width: 100%;
`;

export const Lista = styled.FlatList``

export const Item = styled.TouchableOpacity`
    margin-bottom: 30px;
`;

export const Titulo = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #444;
    padding: 0 5px;
`;

export const ExcerptArea = styled.View`
    width: 100%;
    padding: 0 5px;
`;

export const Excerpt = styled(HTML)``;

export const Loading = styled.ActivityIndicator.attrs({
    size: 'small',
    color: '#444'
})`
    margin: 30px;
`;