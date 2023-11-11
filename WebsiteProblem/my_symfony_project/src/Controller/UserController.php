<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
//use Symfony\Component\HttpFoundation\Response;
//use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

class UserController extends ApiController //AbstractController
{
    /**
    * @Route("/users", methods="GET")
    */
    public function index(UserRepository $userRepository)
    {
        $users = $userRepository->transformAll();

        return $this->respond($users);
    }

    /**
    * @Route("/users", methods="POST")
    */
    public function create(Request $request, UserRepository $userRepository, EntityManagerInterface $em)
    {
        $request = $this->transformJsonBody($request);

        if (! $request) {
            return $this->respondValidationError('Please provide a valid request!');
        }

        // validate the name
        if (! $request->get('name')) {
            return $this->respondValidationError('Please provide a name!');
        }
        // validate the surname
        if (! $request->get('surname')) {
            return $this->respondValidationError('Please provide a surname!');
        }
        // validate the status
        if (! $request->get('status')) {
            return $this->respondValidationError('Please provide a status!');
        }
        // validate the surname
        if (! $request->get('gender')) {
            return $this->respondValidationError('Please provide a gender!');
        }
        // validate the surname
        if (! $request->get('dateOfBirth')) {
            return $this->respondValidationError('Please provide a date of birth!');
        }

        // persist the new user
        $user = new User;
        $user->setName($request->get('name'));
        $user->setSurname($request->get('surname'));
        $user->setStatus($request->get('status'));
        $user->setGender($request->get('gender'));
        $user->setDateOfBirth($request->get('dateOfBirth'));

        $em->persist($user);
        $em->flush();

        return $this->respondCreated($userRepository->transform($user));
    }

    /**
     * @Route("/users/{id}", methods="DELETE")
     */
    public function delete($id, UserRepository $userRepository, EntityManagerInterface $em)
    {
        $user = $userRepository->find($id);

        if (!$user) {
            return $this->respondNotFound('User not found');
        }

        $em->remove($user);
        $em->flush();

        return $this->respondDeleted();
    }
    
    /**
     * @Route("/users/{id}", methods="PUT")
     */
    public function edit($id, Request $request, UserRepository $userRepository, EntityManagerInterface $em)
    {
        $user = $userRepository->find($id);

        if (!$user) {
            return $this->respondNotFound('User not found');
        }

        $request = $this->transformJsonBody($request);

        if (!$request) {
            return $this->respondValidationError('Please provide a valid request!');
        }

        // Update user fields with the new values
        $user->setName($request->get('name'));
        $user->setSurname($request->get('surname'));
        $user->setStatus($request->get('status'));
        $user->setGender($request->get('gender'));
        $user->setDateOfBirth($request->get('dateOfBirth'));

        $em->flush();

        return $this->respond($userRepository->transform($user));
    }

}
