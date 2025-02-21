import { View, Text, ImageBackground, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams,router } from 'expo-router'
import AFFIRMATION_GALLERY from '@/constants/affirmationGallery'
import { GalleryPreviewData } from '@/constants/models/AffirmationCategory'
import AppGradient from '@/components/AppGradient'
import { AntDesign } from '@expo/vector-icons'

const AffirmationPractice = () => {
    const {itemId} = useLocalSearchParams();
    const [affirmation,setAffirmation] = useState<GalleryPreviewData>();
    const [sentences,setSentences] = useState<String[]>([]);

   useEffect(()=>{
       for(let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++){
        const affirmationsData = AFFIRMATION_GALLERY[idx].data;

        const affirmationToStart = affirmationsData.find(
            (a)=>a.id === Number(itemId)
        );

       if(affirmationToStart){
        setAffirmation(affirmationToStart)

         const affirmationsArray = affirmationToStart.text.split(".");

         if(affirmationsArray[affirmationsArray.length - 1] === " ") {
            affirmationsArray.pop();
         }

         setSentences(affirmationsArray)
       }
 
       }
   },[])

  return (
    <View className='flex-1'>
        <ImageBackground
         source={affirmation?.image}
         resizeMode='cover'
         className='flex-1'
        >
          <AppGradient
          colors={["rgba(0,0,0,0.4)","rgba(0,0,0,0.8)"]}
          >
             <Pressable onPress={()=>router.back()} className='absolute top-16 left-6 z-10'>
               <AntDesign
                 name='leftcircleo'
                 size={40}
                 color='white'               
               />
             </Pressable>
             <ScrollView className='mt-20' showsVerticalScrollIndicator={false}>
              <View className='h-full justify-center'>
                <View className='h-4/5 justify-center'>
                {sentences.map((sentence,idx)=>(
                 <Text key={idx} className='text-white text-3xl font-bold text-center mb-12'>
                    {sentence} . 
                    </Text>
                ))}
                   </View>
              </View>
             </ScrollView>
          </AppGradient>
        </ImageBackground>
    </View>
  )
}

export default AffirmationPractice