export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
    session: service('session'),
    authorize(xhr) {
        console.log("Authorize adapter");
        let { dokken } = this.get('session.data.authenticated');
        xhr.setRequestHeader('Authorization', `Bearer ${dokken}`);
    }
});