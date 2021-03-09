import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { 
  Container, 
  InnerArea, 
  Lista, 
  Item, 
  Titulo, 
  ExcerptArea, 
  Excerpt, 
  Loading
} from './style';

import LazyImage from '../../components/LazyImage';

export default () => {

  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState([]);

  const loadMoreItems = async (pageNumber = page, shouldRefresh = false) => {
    if(total && pageNumber > total) return;
    
    setLoading(true);

    const req = await fetch('http://wdesign.com.br/wp-json/wp/v2/posts?_fields=author,id,excerpt,title,link,featured_media,better_featured_image&per_page=4&page=' + pageNumber);
    const json = await req.json();
    const totalPosts = req.headers.get('X-WP-Total');

    if(json.length > 0){
      setTotal( Math.ceil(totalPosts/4) );
      setPosts(shouldRefresh ? json : [...posts, ...json]);
      setPage(pageNumber + 1);
    }

    setLoading(false);
  }

  const refreshList = () => {
    setRefreshing(true);
    loadMoreItems(1, true);
    setRefreshing(false);
  }

  const handleViewableChanged = useCallback(({changed}) => {
    setViewable(changed.map(({item}) => item.id))
  }, []);

  const goToSingle = (post) => {
    navigation.navigate('Single', {
      id: post.id,
    });
  }

  useEffect(()=>{
    loadMoreItems();
  },[]);

  return (
    <Container>
      <InnerArea>
        <Lista 
          data={posts} 
          keyExtractor={(item, index) => 'key-' + index} 
          onEndReached={()=>loadMoreItems()} 
          onEndReachedThreshold={0.1} 
          ListFooterComponent={loading && <Loading />} 
          onRefresh={refreshList} 
          refreshing={refreshing} 
          onViewableItemsChanged={handleViewableChanged} 
          viewabilityConfig={{viewAreaCoveragePercentThreshold: 25}}
          renderItem={(posts) => (
            <Item key={posts.item.id} onPress={()=>goToSingle(posts.item)}>
              { posts.item.better_featured_image !== null  && <LazyImage 
                shouldLoad={viewable.includes(posts.item.id)} 
                smallSource={{uri: posts.item.better_featured_image.media_details.sizes.thumbnail.source_url }} 
                source={{uri: posts.item.better_featured_image.media_details.sizes.medium_large.source_url }} 
              /> }
              <Titulo>{posts.item.title.rendered}</Titulo>
              <ExcerptArea>
                <Excerpt 
                  source={{ 
                    html: posts.item.excerpt.rendered 
                  }} 
                  tagsStyles={{ 
                    p: { 
                      margin: 0, 
                      padding: 0,
                      paddingTop: 5,  
                      textAlign: 'left', 
                      fontSize: 16, 
                      color: '#444' 
                    }
                  }} 
                />
              </ExcerptArea>
            </Item>
          )}
        />
      </InnerArea>
    </Container>
  );
}