import React from "react";

export const langs = {
    tr: {
        //signin
        giris: 'Haydi aramıza katıl !',
        isimAlanı: 'İsminizi giriniz',
        soyisimAlanı: 'Şifrenizi giriniz',
        girisButonu: 'Giriş Yap',
        yada:'ya da',
        kayıtOl: 'Kayıt ol',
        //giriş sayfası bitti 

        //admin
        filmAfisi: 'Film afişini yüklemek için tıklayınız',
        filmBasligi: 'Film Başlığı',
        filmYili:'Film yapım yılı',
        oyuncular:'Oyuncular',
        yönetmen: "Yönetmen",
        kategori: "Film Kategorisi",
        süre: 'Film süresi',
        filmAciklamasi: 'Film açıklaması',
        filmiYükle: 'Filmi yükle',
        filmiGüncelle: 'Filmi güncelle',
        filmGüncellemeBasarili: 'Film başarıyla güncellendi',
        filmYüklemeBasarili: 'Film başarıyla yüklendi.',
        yeniFilmEkle:'Yeni Film Ekle',
        basarili: 'Başarılı',
        //admin bitti

        //cardSlider
        noData: 'Seçili kategori için veriye ulaşılamadı',
        //cardSlider bitti

        //Profil sayfası
        sifreDegistirme: 'Şifreni değiştir',
        mevcutSifre: 'Mevcut şifre',
        yeniSifre: 'Yeni şifre',
        hakkimda: 'Hakkımda bilgilerimi güncelle',
        yapilanYorumlar: 'Yapılan yorumlar',
        top3: 'Top 3 Filmler',
        //profil sayfası bitti

        //yorum kısmı
        yorumsilme:'Yorum başarıyla kaldırıldı',
        yorumMetni:'Film hakkındakini düşüncelerini bizimle paylaş..',
        yorumPaylas: 'Paylaş',
       // yorum kısmı bitti

        //Film Detay
        izlemeListesi: 'İzleme listesine ekle',
        puan: 'Filmi puanla',
        fragman: 'Fragman',
        oyuncular: 'Oyuncular:',
        yönetmen: 'Yönetmen:',
        // Film Detay sayfası bitti

        //Header
        yildizFilmler:'Yıldız Filmler',
        kategoriler:'Kategoriler',
        komedi:'Komedi',
        romantik:'Romantik',
        korku: 'Korku',
        aksiyon: 'Aksiyon',
        drama: 'Drama',
        bilimKurgu:'Bilim Kurgu',
        arama: 'Aramak istediğiniz filmi giriniz',
        profil:'Profil',
        cikisYap: 'Çıkış yap',
        filmler: 'Filmler',
        izlemeListesi:"İzleme Listesi",
        //header bitti

        //AnaSayfa
        seninIcin: 'Senin için yeni filmler ekledik',
        gözAtmak: 'Göz atmak ister misin?',
        kesfet : 'Keşfet',
        kategoriyeUlas: 'Aradığın kategoriye hızlıca ulaş',
        //AnaSayfa bitti

        //filmler
        üzgünüz : 'Aradığınız içerik bulunamadı.',
    },

    en: {
        //signin
        giris: "Let's Join Us !",
        isimAlanı: 'Please enter your name',
        soyisimAlanı: 'Please enter your password',
        girisButonu: 'Log in',
        yada:'or',
        kayıtOl: 'Sign Up',
        //giriş sayfası bitti 

        //admin
        filmAfisi: 'Click to download movie poster',
        filmBasligi: 'Movie Header',
        filmYili:'Production year',
        oyuncular:'Actors',
        yönetmen: "Director",
        kategori: "Movie Category",
        süre: 'Movie Time',
        filmAciklamasi: 'Movie ',
        filmiYükle: 'Movie Upload',
        filmiGüncelle: 'Movie Update',
        filmGüncellemeBasarili: 'Movie',
        filmYüklemeBasarili: 'Movie uploaded successfully',
        yeniFilmEkle:'Add new Movie',
        basarili: 'Succesfully',
        //admin bitti

        //cardSlider
        noData: 'Data not available for selected category',
        //cardSlider bitti

        //Profil sayfası
        sifreDegistirme: 'Change your password',
        mevcutSifre: 'Current Password',
        yeniSifre: 'New Password',
        hakkimda: 'Update my information about me',
        yapilanYorumlar: 'comments',
        top3: 'Top 3 Movies',
        //profil sayfası bitti

        //yorum kısmı
        yorumsilme:'Comment removed successfully',
        yorumMetni: 'Share your thoughts about the movie with us.',
        yorumPaylas: 'Share',
       // yorum kısmı bitti

        //Film Detay
        izlemeListesi: 'Adding watchlist',
        puan: 'Rate the Movie',
        fragman: 'Trailer',
        oyuncular: 'Actors:',
        yönetmen: 'Director:',
        // Film Detay sayfası bitti

        //Header
        yildizFilmler:'Star Movies',
        kategoriler:'Categories',
        komedi:'Comedy',
        romantik:'Romantic',
        korku: 'Horror',
        aksiyon: 'Action',
        drama: 'Drama',
        bilimKurgu:'Science Fiction',
        arama: 'Enter the movie you want to search',
        profil:'Profile',
        cikisYap: 'Log Out',
        filmler: 'Movies',
        izlemeListesi:"Watch List",
        //header bitti

        //AnaSayfa
        seninIcin: 'We added new movies for you!',
        gözAtmak: 'Wanna take a look?',
        kesfet : 'Explorer',
        kategoriyeUlas: 'Quickly find the category you are looking for',
        //AnaSayfa bitti

        //filmler
        üzgünüz : 'The content you were looking for was not found.',
    }
}

const LangContext = React.createContext(langs.tr);
export default LangContext;