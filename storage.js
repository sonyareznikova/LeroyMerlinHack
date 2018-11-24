class MemoryStorage{
    constructor(){
        this.users = {}
    }

    // first obj - for moodboard, second obj - for articles & videos
    setUser(id, first_name, username){
        this.users[id] = [first_name, username, {}, {}]
    }

    getUsername(id){
        return this.users[id]
    }

    addMoodboardPic(id, room_name, pic_address) {
        if (this.users[id][2][room_name] !== undefined) this.users[id][2][room_name].push(pic_address);
        else { this.users[id][2][room_name] = [pic_address]; }
    }

    getMoodboardPics(id, room_name) {
        return this.users[id][2][room_name];
    }

    getMoodboardRoomNames(id) {
        console.log(this.users[id][2]);
        console.log(Object.keys(this.users[id][2]));
        return Object.keys(this.users[id][2]);
    }

    addFavourite(id, step_name, link) {
        if (this.users[id][3][step_name] !== undefined) this.users[id][3][step_name].push(link);
        else { this.users[id][3][step_name] = [link]; }
    }

    getFavourites(id, step_name) {
        return this.users[id][3][step_name];
    }

    getFavouriteStepNames(id) {
        return Object.keys(this.users[id][3]);
    }

}


let memoryStorage = new MemoryStorage();

module.exports = memoryStorage;