# frozen_string_literal: true

class ApplicationController < ActionController::Base
  skip_forgery_protection
  include DeviseTokenAuth::Concerns::SetUserByToken
end
