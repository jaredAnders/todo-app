require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  describe "tasks#index" do
    it "should list the tasks in the db" do
      task1 = FactoryGirl.create(:task)
      task2 = FactoryGirl.create(:task)
      task1.update_attributes(done: true)
      get :index
      expect(response).to have_http_status :success

      response_value = ActiveSupport::JSON.decode(@response.body)
      expect(response_value.count).to eq(2)

      response_ids = response_value.collect {|task| task["id"]}
      expect(response_ids).to eq([task1.id,task2.id])
    end
  end

  describe "tasks#create action" do
    it "should successfully create a task in the db" do
      post :create, task: {title: 'foo'}
      expect(response).to have_http_status :success
      response_value = ActiveSupport::JSON.decode(@response.body)
      expect(response_value['title']).to eq('foo')
      expect(Task.last.title).to eq('foo')
    end
  end

  describe "tasks#update action" do
    it "should successfully update tasks in the db" do
      task = FactoryGirl.create(:task)
      put :update, id: task.id, task: {done: true}
      expect(response).to have_http_status :success

      task.reload
      expect(task.done).to eq(true)
    end
  end

end
