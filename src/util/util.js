export const checkObjectEmpty = (obj) => {
   return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const getCookiePlayerId = () => {
   const keyLength = 36;
   const indexToStart = document.cookie.indexOf("player_sub=") + "player_sub=".length;
   const playerId = document.cookie.substring(
      indexToStart,
      indexToStart + keyLength
   );
   console.log(playerId);
   return playerId;
}