<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth  as JWTAuth;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()]);
        }

        $user = new User();
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json(compact('user'), 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $user = DB::table('users')->where('email', $credentials['email'])->first();

        if ($user !== null) {
            if (\Hash::check($request->password, $user->password)) {
                if($user->email_verified_at !== null) {
                    if ( ! $token = JWTAuth::attempt($credentials)) {
                        return response([
                            'status' => 'error',
                            'error' => 'invalid.credentials',
                            'msg' => 'Invalid Credentials.'
                        ], 400);
                    }
                    return response([
                        'status' => 'success'
                    ])
                        ->header('Authorization', $token);
                }
                else {
                    return response([
                        'status'=> 'error',
                        'message'=> 'Account wasn\'t verified.'
                    ], 402);
                }
            } else {
                return response([
                    'status'=> 'error',
                    'message'=> 'Wrong password.'
                ], 401);
            }
        } else {
            return response([
                'status'=> 'error',
                'message'=> 'Account wasn\'t created.'
            ], 500);
        }
    }
    
    public function user(Request $request)
    {
        $user = User::find(Auth::user()->id);
        return response([
            'status' => 'success',
            'data' => $user
        ]);
    }

    public function verify($token) {
        $user = DB::table('users')
            ->where('api_token', $token)
            ->first();

        if($user->email_verified_at !== null){
            return response()->json([
                'success'=> true,
                'message'=> 'Account already verified.'
            ]);
        }

        DB::table('users')
            ->where('api_token', $token)
            ->update([
                'api_token' => null,
                'email_verified_at' =>DB::raw('current_timestamp')
            ]);

        return redirect()->guest('/#/login');
    }

    public function sendPasswordResetLink(Request $request)
    {
        $subject = Lang::get('mail.reset_password');
        $token = \Str::random(32);
        $user = User::where('email', $request->email)->first();
        $user->remember_token = $token;
        $user->save();

        if($user) {
            return $this->sendResetLinkEmail($user, $subject);
        } else {
            return response([
                'status' => 'error',
                'message' => 'There is no such account.'
            ], 400);
        }
    }

    protected function sendResetLinkEmail($user, $subject) {
        if ($user->email_verified_at) {
            $name = $user->name;
            $email = $user->email;
            $token = $user->remember_token;

            Mail::send('email.restore', ['token' => $token],
                function ($mail) use ($email, $name, $subject) {
                    $mail->from('craigstiel@gmail.com', 'missioner');
                    $mail->to($email, $name);
                    $mail->subject($subject);
                });

            return response([
                'status' => 'success'
            ]);
        } else {
            return response([
                'status' => 'error',
                'message' => 'Account wasn\'t verified.'
            ], 401);
        }
    }

    public function resetPassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'token' => 'required',
        ]);

        if($request->token !== null) {
            $user = User::where('remember_token', '=', $request->token)->first();
            if($user !== null) {
                $user->password = bcrypt($request->password);
                $user->remember_token = null;
                $user->save();
                return response()->json(compact('user'),201);
            } else return response([
                'status' => 'error',
                'message' => 'Try again.'
            ], 400);
        } else return response([
                'status' => 'error',
                'message' => 'Try again.'
            ], 400);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function logout()
    {
        auth()->logout();
        return redirect()->guest('/#/login');
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}