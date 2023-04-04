<template>
    <n-button quaternary circle @click="showModal = !showModal">
        <template #icon>
            <material-symbol>info</material-symbol>
        </template>
    </n-button>
    <n-modal v-model:show="showModal" style="width: 480px;text-align: justify;" preset="card" :title="$t('about')"
        :auto-focus="false">
        <div v-if="$i18n.locale.slice(0, 2) === 'zh'">
            <n-p>
                欢迎来到交汇中国推荐，这个网站可以帮助你找到最适合在华留学生的网站。无论你是在寻找信息、娱乐、教育还是社交网络，交汇中国都能满足你。在本指南中，我们将告诉你如何使用交汇中国的功能，使你的在线体验更加愉快和方便。
            </n-p>
            <n-p>
                第一，你可以通过点击网站右上角的语言切换按钮选择你喜欢的语言。你可以在任何时候在英文和中文之间切换。网站会自动为你翻译内容和界面。
            </n-p>
            <n-p>
                第二，你可以通过点击语言切换按钮旁边的主题切换按钮来调整网站的主题。你可以根据自己的喜好和照明条件选择深色和浅色主题。网站会记住你的选择，并将其应用于每个页面。
            </n-p>
            <n-p>
                第三，你可以通过点击左侧边栏上的类别来浏览推荐的网站。你也可以使用搜索框，通过名称或关键词找到一个特定的网站。你可以通过使用右侧边栏上的下拉菜单，按评级、受欢迎程度、语言或类别过滤结果。你还可以通过点击右侧边栏上的图标，按相关性、字母顺序或日期对结果进行排序。
            </n-p>
            <n-p>
                第四，你可以通过点击每个网站名称旁边的书签图标将你喜欢的网站加入书签。你可以通过点击网站右上角的书签图标来访问你的书签。你也可以通过再次点击书签图标来删除书签。
            </n-p>
            <n-p>
                第五，你可以通过点击每个网站名称旁边的分享图标与朋友分享你的发现。你可以选择各种社交媒体平台，如Facebook、Twitter、微信或WhatsApp。你也可以将链接复制到你的剪贴板上，并粘贴到你想去的任何地方。
            </n-p>
            <n-p>
                第六，如果你有任何问题、建议或投诉，你可以点击网站底部的联系我们链接与我们联系。你可以在表格中填写你的姓名、电子邮件地址、主题和信息，然后点击提交。我们会尽快给你答复。
            </n-p>
            <n-p>
                我们希望你喜欢使用交汇中国，并认为它是有用的和有帮助的。感谢你选择交汇中国作为你在中国的外国学生的在线指南。
            </n-p>
        </div>
        <div v-else>
            <n-p>
                Welcome to CNection Recommendations, a website that helps you find the best websites for foreign students in China. Whether
                you are looking for information, entertainment, education, or social networking, CNection has you covered.
                In this guide, we will show you how to use the features of CNection to make your online experience more
                enjoyable and convenient.
            </n-p>
            <n-p>
                First, you can choose your preferred language by clicking on the language switch button at the top right
                corner of the website. You can switch between English and Chinese at any time. The website will
                automatically translate the content and interface for you.
            </n-p>
            <n-p>
                Second, you can adjust the theme of the website by clicking on the theme switch button next to the language
                switch button. You can choose between dark and light themes according to your preference and lighting
                conditions. The website will remember your choice and apply it to every page.
            </n-p>
            <n-p>
                Third, you can browse the recommended websites by clicking on the categories on the left sidebar. You can
                also use the search box to find a specific website by name or keyword. You can filter the results by rating,
                popularity, language, or category by using the drop-down menus on the right sidebar. You can also sort the
                results by relevance, alphabetical order, or date by clicking on the icons on the right sidebar.
            </n-p>
            <n-p>
                Fourth, you can bookmark your favorite websites by clicking on the bookmark icon next to each website name.
                You can access your bookmarks by clicking on the bookmark icon on the top right corner of the website. You
                can also remove a bookmark by clicking on the bookmark icon again.
            </n-p>
            <n-p>
                Fifth, you can share your findings with your friends by clicking on the share icon next to each website
                name. You can choose from various social media platforms such as Facebook, Twitter, WeChat, or WhatsApp. You
                can also copy the link to your clipboard and paste it anywhere you want.
            </n-p>
            <n-p>
                Sixth, you can contact us if you have any questions, suggestions, or complaints by clicking on the contact
                us link at the bottom of the website. You can fill in your name, email address, subject, and message in the
                form and click on submit. We will get back to you as soon as possible.
            </n-p>
            <n-p>
                We hope you enjoy using CNection and find it useful and helpful. Thank you for choosing CNection as your
                online guide for foreign students in China.
            </n-p>
        </div>
    </n-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
let showModal = ref(false);
</script>

<style scoped></style>