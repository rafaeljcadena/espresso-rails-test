# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/user
class UserPreview < ActionMailer::Preview
  def welcome
    UserMailer.welcome(User.last.id).deliver_now
  end
end
