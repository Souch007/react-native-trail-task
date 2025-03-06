import React, { useState } from 'react';
import { 
    FlatList, Image, KeyboardAvoidingView, Platform, 
    Text, TextInput, View, ActivityIndicator 
} from 'react-native';
import styles from './styles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import useInterestSearch from '../hooks/useInterestSearch';
import { observer } from 'mobx-react-lite';
import { searchStore } from '../stores/SearchStore';



const HomeScreen = observer(() => {
    //const { query, data, loading, handleQueryChange, loadMoreData } = useInterestSearch();
    const [focus, setFocus] = useState<boolean>(false);

    const renderListItem = ({ item }: { item: any }) => (
        <View style={styles.resultItem}>
            <Image source={{ uri: item.avatar ?? '' }} style={styles.avatar} />
            <Text>{item.name}</Text>
        </View>
    );

    const renderSkeleton = () => (
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" margin={20}>
                <SkeletonPlaceholder.Item width={30} height={30} borderRadius={15} />
                <SkeletonPlaceholder.Item marginLeft={10} width={120} height={20} borderRadius={4} />
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    );

    return (
        <View style={[styles.homePageContainer, { flex: 1, justifyContent: 'flex-end' }]}>
            {focus && (
                <View style={styles.resultsContainer}>
                    <FlatList
                        data={searchStore.data}
                        keyExtractor={(item, index) => item.id.toString() }
                        inverted
                        renderItem={({ item }) => renderListItem({ item })}
                        onEndReached={searchStore.loadMoreData}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={searchStore.loading ? renderSkeleton() : null}
                        style={styles.resultsList}
                    />
                </View>
            )}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.autocompleteContainer}
            >
                <TextInput
                    style={[styles.input, { borderColor: focus ? "#00008B" : "#999" }]}
                    placeholder="Search..."
                    placeholderTextColor="grey"
                    value={searchStore.query}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChangeText={searchStore.setQuery}
                />
            </KeyboardAvoidingView>
        </View>
    );
});

export default HomeScreen;
