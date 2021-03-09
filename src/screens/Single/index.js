import React, { useEffect, useState } from 'react';
import { Alert, RefreshControl } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Loading, Container, Scroller, PostArea, TituloArea, Titulo, FeaturedImage, ConteudoArea, Conteudo } from './style';

export default () => {

    const route = useRoute();

    const [titulo, setTitulo] = useState('');
    const [imagem, setImagem] = useState(null);
    const [conteudo, setConteudo] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const getSinglePost = async () => {
        setLoading(true);

        if(route.params.id && route.params.id !== ''){
            const req = await fetch('http://wdesign.com.br/wp-json/wp/v2/posts/' + route.params.id);
            const res = await req.json();
            setTitulo(res.title.rendered);
            setImagem(res.better_featured_image ? res.better_featured_image.media_details.sizes.medium_large.source_url : null);
            setConteudo(res.content.rendered);
        } else {
            Alert.alert('Atenção', 'Nenhum id foi informado.');
        }

        setLoading(false);
    } 

    useEffect(()=>{
        getSinglePost();
    }, []);

    const atualiza = () => {
        setRefreshing(true);
        getSinglePost();
        setRefreshing(false);
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={atualiza} />
            }>
                { loading && <Loading /> }
                { !loading && <PostArea>
                    { imagem !== null && <FeaturedImage source={{ uri: imagem }} /> }
                    { titulo !== '' && <TituloArea>
                        <Titulo>{ titulo }</Titulo>
                    </TituloArea> }
                    { conteudo !== '' && <ConteudoArea>
                        <Conteudo source={{
                            html: conteudo
                        }} />
                    </ConteudoArea> }
                </PostArea> }
            </Scroller>
        </Container>
    );
}